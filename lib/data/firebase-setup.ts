import { Auth, signInWithEmailAndPassword } from 'firebase/auth';
export const getEditorAuth = (auth: Auth) => {
  signInWithEmailAndPassword(auth, 'editor@pleb.stream ', 'xrv8sjK2T5ZslpZXJlxG5p7FJsBrdf2xkHcMGksBVflmHZs6')
    .then(cred => {
      console.log(`editor user successfully logged in`)
      return cred
    })
    .catch(err => {
      console.log(err)
    })
}
