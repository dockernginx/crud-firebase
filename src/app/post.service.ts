import { Injectable } from '@angular/core';
import { AngularFirestore } from'@angular/fire/compat/firestore';
import { Post } from './post.model'; 
@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private angularFirestore: AngularFirestore) { }
  //Metodos para el crud
  getPost(){
    return this.angularFirestore
           .collection("database") 
           .snapshotChanges()
  }
  getPostById(id){
    return this.angularFirestore
    .collection("database")
    .doc(id)
    .valueChanges()

  }
  createPost(post: Post){
    return new Promise<any>((resolve, reject) => {
        this.angularFirestore
      .collection("database")
      .add(post)
      .then( (response)=>{
        console.log(response)
      }, 
      (error)=>{
        reject(error)
      })
    })
  }
  updatePost(post: Post, id){
     return this.angularFirestore
     .collection("database")
     .doc(id)
     .update({
      title: post.title,
      content: post.content, 
      author: post.author
     }); 
  }
  delatePost(post){
    return this.angularFirestore
    .collection("database")
    .doc(post.id)
    .delete();
  }
}
