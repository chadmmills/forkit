type DevCmd = {
  name: string,
  cmd: string[],
  options: {
    cwd?: string,
    stderr?: "inherit" | "pipe" | "ignore" ,
  }
}

const DEV_CMDS: DevCmd[] = [
  { name: "API", cmd: [ "bun", "--watch", "server/index.ts"], options: { cwd: "../api" } },
  { name: "WEB", cmd: [ "npm", "run", "dev" ], options: { cwd: "../web" } },
]

function consoleWriteForName(name: string) {
  const consoleWrite = new WritableStream({
    write(chunk) {
      const buffer = new ArrayBuffer(1)
      const view = new Uint8Array(buffer)
      view[0] = chunk
      const decoded = new TextDecoder("utf-8").decode(chunk)
      console.log(name, ":", decoded.replace(/\n$/, ""))
    }
  })

  return consoleWrite
}

const procs = DEV_CMDS.map(({ cmd, name, options }) => {
  let spawnedProc = Bun.spawn(cmd, { ...options, stdout: "pipe" })
  spawnedProc.stdout?.pipeTo(consoleWriteForName(name))

  return spawnedProc
})

process.on("SIGINT", () => {
  console.info("SIGINT signal received... quitting all processes")
  procs.forEach(proc => proc.kill())
  process.exit()
})

