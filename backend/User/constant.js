
exports.http_codes = {
    ok:200,
    bad_request:400,
    unauthorized:401,
    forbidden:403,
    internalServerError : 500
};

exports.message = {
    invalid_name : "Invalid Name.",
    invalid_email : "Invalid Email.",
    strong_password : "Enter strong-Password.",
    invalid_password : "Invalid Password.",
    wrong_role : "Enter Valid Role.",
    invalid_role: "You are not eligible To perform this action.",
    invalid_request_body : "Request Body Not containing all require field.",
    unexsisted_user:"User not Exsist.",
    expired_token : "Token expire.",
    invalid_Token : "Invalid Token",
    exsist_user : "User already registered.",
    userNotExist : "User Not Exsist.",
    valid_user:"valid User.",
    internalServerError : "Internal Server Error.",
    dataNotFound : "Data Not available.",
    mongoQueryError : "Query not perform.",
    queryNotPerform : "Internal server error Query not performed.",
    userCreated : "Registered Successfully.",
    loggedIn : "Login Successful.",
    updated : "User Updated Successfully.",
    userDetails : "User Details.",
    statusChanged : "User Status Changed Successfully.",
    logout :"User Logout Successfully.",
    canNotEnterPassword :"You can't change Password.",
    invalisObjectId : "UserId is not Valid",
    emailSend : "Check Your Mail",
    changedPassword : "Successfully Change Password"
};

exports.role = {
    King : "KING",
    Queen : "QUEEN",
    Male : "MALE",
    Female : "FEMALE"
};

exports.models = {
    user : "User",
    token : "Token"
}