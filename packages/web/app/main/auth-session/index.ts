import type { ValidationErrors } from "../validate";
import validate from "../validate";
import Api from "../api";

type AuthSessionOptions = {
  validateData?: typeof validate;
  requestJWTForSession?: (session: AuthSession) => Promise<{
    isError: boolean;
    errors?: any;
    token?: string;
  }>;
};

export default class AuthSession {
  private request: Request;
  private requestJWTForSession: (
    session: AuthSession,
  ) => Promise<{ isError: boolean; errors?: any; token?: string }>;

  attributes: { email: string; password: string };
  errors: ValidationErrors = {};
  token: string = "";
  validateData: typeof validate;

  constructor(req: Request, options?: AuthSessionOptions) {
    const { validateData = validate, requestJWTForSession = Api.postSession } =
      options || {};

    this.attributes = { email: "", password: "" };
    this.request = req;
    this.validateData = validateData;
    this.requestJWTForSession = requestJWTForSession;
  }

  static init(req: Request) {
    return new AuthSession(req);
  }

  async create() {
    let formData = await this.request.formData();
    this.attributes = {
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    };

    let validationResult = this.validateData(
      { email: true, password: true },
      formData,
    );

    if (validationResult.isInValid) {
      this.errors = validationResult.errors;
      return this;
    }

    let tokenResult = await this.requestJWTForSession(this);
    if (tokenResult.isError) {
      this.errors = tokenResult.errors;
      return this;
    }

    if (tokenResult.token) {
      this.token = tokenResult.token;
    }

    return this;
  }

  get isValid() {
    return Object.keys(this.errors).length === 0;
  }
}
