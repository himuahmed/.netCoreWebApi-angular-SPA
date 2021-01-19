import {Photo} from './photo';

export interface User {
    id: number;
    username: string;
    knownAs: string;
    introduction: string;
    gender: string;
    city: string;
    country: string;
    photoUrl: string;
    age: number;
    createdAt : Date;
    lastActive: Date;
    interests?: string;
    lookingFor?: string;
    photos?: Photo[];
}