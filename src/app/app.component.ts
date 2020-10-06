import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';

interface Navigation {
  id: number;
  isActive: boolean;
  redirect: ElementRef;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, AfterViewChecked {

  @ViewChild("home", { read: ElementRef }) home: ElementRef;
  @ViewChild("about", { read: ElementRef }) about: ElementRef;
  @ViewChild("gallery", { read: ElementRef }) gallery: ElementRef;
  @ViewChild("contact", { read: ElementRef }) contact: ElementRef;

  navigation: Navigation[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
  
  ngAfterViewInit(): void {
    this.navigation = [
      { "id": 0, "isActive": true, "redirect": this.home },
      { "id": 1, "isActive": false, "redirect": this.about },
      { "id": 2, "isActive": false, "redirect": this.gallery },
      { "id": 3, "isActive": false, "redirect": this.contact }
    ];
  }

  changePage(navigation: Navigation) {
    this.navigation.forEach((nav) => {
      nav.isActive = nav.id === navigation.id ? true : false;
    });

    navigation.redirect.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}