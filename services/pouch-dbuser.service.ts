import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root'
})
export class PouchDBUserService {
  public pouchDB: PouchDB;
  public users: any;
  public data: any;

  constructor() 
  { 
    this.initPouchDBUser();
  }
  AllUser() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.pouchDB.allDocs({

        include_docs: true

      }).then((result) => {

        this.data = [];

        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });

        resolve(this.data);

        this.pouchDB.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {

        console.log(error);

      });
    });
  }
  change(user){
    return this.pouchDB.put(user);
  }
  delete(user){
    return this.pouchDB.remove(user);
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
  initPouchDBUser(){
    this.pouchDB = new PouchDB('user');
  }
  insertUserPouchDB(user){
    return this.pouchDB.put(user);
  }

}
