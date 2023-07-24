const DEV_CMDS = [
  // { cmd: [ "bun", "--watch", "server/index.ts"], options: { cwd: "./api" } },
  { cmd: [ "bun", "--watch", "server/index.ts"], options: { stdout: "inherit" } },
]

const procs = DEV_CMDS.map(({ cmd, options }) => {
  return Bun.spawn(cmd, options)
})

for (const proc of procs) {
  // console.log(proc.stdout.pipeTo(process.stdout))
}

console.log(DEV_CMDS)

process.on("SIGINT", () => {
  procs.forEach(proc => proc.kill())
  process.exit()
})
