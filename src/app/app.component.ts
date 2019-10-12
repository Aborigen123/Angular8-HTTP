import { Component, OnInit } from '@angular/core';
import { CarsService } from './cars.service';


interface Cars{
  name: string,
  color: string,
  id: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  colors=[
    'red',
    'blue',
    'pick',
    'green',
    'yellow',
    'grey'
  ]
  
cars: Cars[] = [];
carName: string = '';

appTitle ;

constructor(private carsService: CarsService){}

// ngOnInit(): void { // this.carsService.getCars() - верне Observable  і тут буде stream тому ставимо прослушку (.subscribe)
//     this.carsService.getCars().subscribe((response: Response) =>{
//       const data = response;
//       this.cars = Object.assign(data);
//        console.log(data);
//     }); 
// }
ngOnInit(): void { 
  this.appTitle = this.carsService.getAppTitle();
console.log( this.appTitle)
}

loadCar(){
this.carsService.getCars().subscribe((car: Cars[]) =>{
  this.cars = car;
},
(error) => {
  alert(error);
}
); 
}

addCar(){
this.carsService.addCar(this.carName).subscribe((car: Cars[]) =>{
this.cars.push(Object.assign(car));
});
this.carName='';
}


getRandColor(){
  const num = Math.round(Math.random() * this.colors.length - 1)
  return this.colors[num];
}

setNewColor(car: Cars){
   this.carsService.changeColor(car, this.getRandColor()).subscribe((data) => {
     console.log(data);
   });
}
deleteCar(car: Cars){
  this.carsService.deleteCar(car).subscribe((data) => {
   this.cars = this.cars.filter(c => c.id !== car.id)
  })
}
}
