import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  { Observable } from 'rxjs';
import  'rxjs/Observable';
import  'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class CarsService {

    constructor(private http: HttpClient){}

    getCars() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf8'
        });
       return this.http.get('http://localhost:3000/cars', {headers: headers})   //.map((response: Response) => {return response});
       .catch((error: Response) => {
           return Observable.throw('Server is broking');
       });
     
   
    }

    addCar(carName:string){
        const data = {
            name: carName,
            color: 'blue'
        }
      return this.http.post('http://localhost:3000/cars', data)
    }

    changeColor(car:any, color: string){
      car.color =  color;//зразу мінятиме на фронтенді так бажано не робити
      return this.http.put(`http://localhost:3000/cars/${car.id}`, car);
    }

    deleteCar(car: any){
     return this.http.delete(`http://localhost:3000/cars/${car.id}`);
    }

    getAppTitle()  {
        return this.http.get('http://localhost:3000/title').map((response : Response) => {
      //@ts-ignore 
     response.value })//.map((data) => { console.log(data) }) ;
    }
}