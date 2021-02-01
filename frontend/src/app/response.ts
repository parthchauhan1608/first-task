export interface GetAll {
    code : number;
    message : string;
    data :[ 
        {
            status : Boolean;
            _id : string;
            name : string;
            email : string;
            role : string;
        }
    ];
    count:number;
}

export interface Login {
    code : number;
    message : string;
    data : {
        status : Boolean;
        _id : string;
        name : string;
        email : string;
        role : string;
        password : String;
    };
    token:string;
}

export interface Register{
    code : number;
    message : string;
    data : {
        status : Boolean;
        _id : string;
        name : string;
        email : string;
        role : string;
    };
}

export interface GetById{
    code : number;
    message : string;
    data : {
        status : Boolean;
        _id : string;
        name : string;
        email : string;
        role : string;
        image : string;
    };
}

export interface ToggleStatus{
    code : number;
    message : string;
}

export interface Update{
    code : number;
    message : string;
    data : {
        status : Boolean;
        _id : string;
        name : string;
        email : string;
        role : string;
        image: string;
    };
}

export interface Logout{
    code : number;
    message : string;
}

export interface Forgot{
    code : number;
    message : string;
}

export interface ChangePassword{
    code : number;
    message : string;
}

export interface FileUpload{
    code:number;
    message:string;
    url:string;
    thumbnail:string;
}
