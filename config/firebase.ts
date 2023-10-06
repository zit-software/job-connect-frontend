import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';

import credential from './firebase_credential.json';

const app = initializeApp(credential);

export const auth = getAuth(app);
