import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-west-2_OfPC2fv4C",
    ClientId: "ov1bte5m34bjfr9s0pe17iumt"
}

export default new CognitoUserPool(poolData);