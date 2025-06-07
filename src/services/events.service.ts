import {emails} from '../data/emails.js';

export const getEvents = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(emails);
        }, 1500)
    })
}