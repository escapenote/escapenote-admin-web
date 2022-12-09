export interface IAuth {
  /** 아이디 */
  sub: string;
  /** 이메일 */
  email: string;
  /** 이메일 인증 여부 */
  email_verified: true;
}
