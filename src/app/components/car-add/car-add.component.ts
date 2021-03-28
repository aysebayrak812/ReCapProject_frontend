import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,FormControl,Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm: FormGroup;
  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createCarAddForm();
  }
  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
      brandName: ["", Validators.required],
      colorName: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required]
    })
  }
  add(){
    if(this.carAddForm.valid){
      let carModel=Object.assign({},this.carAddForm.value)
      this.carService.add(carModel).subscribe(data=>{
        console.log(data)
        this.toastrService.success(data.message, "Başarılı")

      },responseError=>{
        console.log(responseError.error)
        this.toastrService.error(responseError.error)
      })
    }
    else{
      this.toastrService.error("Form Bilgilerini Eksiksiz Doldurunuz...","Dikkat")

    }
    
    
    
  }

}

                      //car service=add ekle


//FormBuilder = HTML DEKİ FORM ile burayı yapılandırmaya yarıyor