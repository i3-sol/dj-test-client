import { toast } from 'react-toastify';

export const showToast = (html: string, type: 'info' | 'success' | 'warning' | 'error' | 'default') => {
	toast(html, {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		type,
		theme: 'colored',
	});
}

export const emailValidator = (mail: string) => {
    if (!mail) {
        return { status: false, msg: 'Email is required!' }
    }

    if (
        !mail.match(
            // eslint-disable-next-line
            /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi
        )
    ) {
        return { status: false, msg: 'Invalid email type!' }
    } else {
        return { status: true, msg: '' };
    }
}

export const strongPasswordValidator = (password: string) => {
    if (!password) {
        return { status: false, msg: 'Password is required' }
    }

    if (password.length < 8) {
        return { status: false, msg: '8 Characters length!' }
    }

    if (!password.match(/[A-Z]/)) {
        return { status: false, msg: 'A letter in upper case!' }
    }

    if (!password.match(/[0-9]/)) {
        return { status: false, msg: 'A numeral (0-9)!' }
    }

    if (!password.match(/[!@#$%^&*()]/)) {
        return { status: false, msg: 'A letter special character!' }
    }
    return { status: true, msg: 'Password is Strong!' }
}

export const passwordMatch = (pwd: string, conf_pwd: string) => {

    if (pwd !== conf_pwd) {
        return { status: false, msg: 'The Password and Confirm password fields do not match.' }
    }
    return { status: true, msg: '' }
}

export const checkValidator = (value: any) => {
    if (value === "") {
        return {status: false, msg: `${value} is required!`}
    }
};