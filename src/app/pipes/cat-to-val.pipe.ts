import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'catToVal'
})
export class CatToValPipe implements PipeTransform {
  private catVal: string;

  transform(value: string): string {
    this.catVal = ''
    switch (value) {
      case 'All Categories':
        this.catVal = '-1';
        break;
      case 'Art':
        this.catVal = '550';
        break;
      case 'Baby':
        this.catVal = '2984';
        break;
      case 'Books':
        this.catVal = '267';
        break;
      case 'Clothing, Shoes & Accessories':
        this.catVal = '11450';
        break;
      case 'Computers/Tablets & Networking':
        this.catVal = '58058';
        break;
      case 'Health & Beauty':
        this.catVal = '26395';
        break;
      case 'Music':
        this.catVal = '11233';
        break;
      case 'Video Games & Consoles':
        this.catVal = '1249';
        break;
      default:
        this.catVal = '-1';
        break;
    }
    return this.catVal;
  }

}
