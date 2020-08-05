export class PaymentMethods{
    CREDIT_CARD: Method;
}

export class Method{
    name: string;
    options: Option;
    code: number;
}

export class Option{
    AMEX: Bandeira;
    VISA: Bandeira;
}

export class Bandeira{
    
    code: number;
    displayName: string;
    name: string;
    status: string;
}

export class Image{
    MEDIUM: PropImage;
    SMALL: PropImage;
}

export class PropImage{
    size: string;
    path: string;
}