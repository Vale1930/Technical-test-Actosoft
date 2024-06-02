
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
    import { 
      getFirestore, 
      collection, 
      addDoc, 
      deleteDoc,
      getDocs,
      onSnapshot,
      doc,
      getDoc,
      updateDoc
    } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      authDomain: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      projectId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      storageBucket: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      messagingSenderId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      appId: "x:yyyyyyyyyy:zz:bbbbbbbbbbbbbbbbbbbbbbbbbbb"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    const db = getFirestore(app);

    export const saveForm = (name,price,description,category,ingredients) =>
      addDoc(collection(db, 'forms' ), {name, price, description, category, ingredients});
    
    export const getForms = () =>  getDocs(collection(db,'forms'));

    export const onGetForms = (callback) => onSnapshot(collection(db,'forms'), callback);

    export const deleteForm = (id) => deleteDoc(doc(db, "forms", id));

    export const getForm = id => getDoc(doc(db, "forms", id));
    
    export const updateForm = (id, newFields) => 
      updateDoc(doc(db, "forms", id), newFields);

    

    

