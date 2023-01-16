export interface AuthI {
    company_id: string
    cpf: string
    date_created: string
    date_updated: string
    email: string
    id: string
    name: string
    phone: string
    status: boolean
}

export interface LoginI {
    username: string;
    password: string;
}

export interface HeaderI {
    headerType: 'main' | 'variant';
    title?: string;
}

export type LoginStepI =
    | 'LOGIN'
    | 'FORGOT_PASSWORD'
    | 'EMAIL_SENT'
    | 'REDEFINE_PASSWORD'
    | 'REDEFINE_SUCCESS'

export interface AuthContextI {
    auth: boolean;
    handleLogin: (data: LoginI) => void;
    handleLogout: () => void;
    loading: boolean;
    header: HeaderI;
    setHeader: (header: HeaderI) => void;
    loginStep: LoginStepI
    setLoginStep: (step: LoginStepI) => void;
    forgotPassword: (email: string, username: string) => void;
    resetPassword: (email: string, oldPassword: string, newPassword: string) => void;
}