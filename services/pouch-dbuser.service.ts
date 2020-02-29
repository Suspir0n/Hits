import PouchDB from 'pouchdb';
import { Injectable, OnInit } from '@angular/core';

var pouchDB: PouchDB = new PouchDB('user');

@Injectable({
  providedIn: 'root'
})
export default class PouchDBUserService{
  
  public users: any;
  public data: any;

  constructor() 
  { 
  }

   AllUser() {
     if (this.data) {
       return Promise.resolve(this.data);
     }

     return new Promise(resolve => {

       pouchDB.allDocs({

         include_docs: true

       }).then((result) => {

         this.data = [];

         let docs = result.rows.map((row) => {
           this.data.push(row.doc);
         });

         resolve(this.data);

          pouchDB.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
           this.handleChange(change);
         });

       }).catch((error) => {

         console.log(error);

       });
     });
   }
   change(user){
     return pouchDB.put(user);
   }
   delete(user){
     return pouchDB.remove(user);
   }
   handleChange(change: any) {
     let changedDoc = null;
     let changedIndex = null;

     this.data.forEach((doc, index) => {

       if (doc._id === change.id) {
         changedDoc = doc;
         changedIndex = index;
       }

     });
    
     //A document was deleted
     if (change.deleted) {
       this.data.splice(changedIndex, 1);
     }
     else {

       //A document was updated
       if (changedDoc) {
         this.data[changedIndex] = change.doc;
       }

       //A document was added
       else {
         this.data.push(change.doc);
       }

     }
   }
  
   insertUserPouchDB(user){
     pouchDB.put(user);
   }

}
