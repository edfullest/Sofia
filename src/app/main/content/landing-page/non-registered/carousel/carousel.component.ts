import { Component, ElementRef, Renderer, Input, Output, Optional, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
    selector: 'content-carousel',
    template:
      `
        <div class="slider">
          <div class="sliderArrows">
            <a (click)="backWard()"> < </a>
            <a (click)="forWard()"> > </a>
          </div>
          <ul class="slideShow">
            <li *ngFor="let li of slides" [ngStyle]="{'display':li?.hidden?'none':'unset'}" [ngClass]="li?.classes">
              <print-slide [meta]="li"></print-slide>
            </li>
          </ul>
        </div>
      `,
    styleUrls: ['./carousel.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CarouselComponent {
    /**
     * Play Interval
     */
    @Input('playInterval') interval: any = 2000;
    slides: any;

    @Input('slides') set _slides(s){
        this.slides = s;
        this.number = this.slides.length;
        if (this.slides.length){
            this.slides[0]['classes'] = ['active'];
        }
    }

    @Input('autoPlay') set _autoPlay(b: boolean){
        this.autoPlay = b;
        if (b){
            this.auto(this.interval);
        }
    }

    currentElement = 0;
    autoPlay = false;
    number = 0;
    intervalTime: 1000; // in ms(mili seconds)
    private delayHideSetTimeOutControl: any;

    constructor(){  }

    backWard(){
        if (this.autoPlay){
          clearInterval(this.interval);
        }
        this.currentElement = this.currentElement - 1;
        if (this.currentElement < 0){
            this.currentElement = this.number - 1;
        }
        this.removeClasses();
        const prev = this.currentElement === this.number - 1 ? 0 : this.currentElement + 1;

        this.slides[prev].classes = ['animateForward'];
        this.show(this.slides[prev]);
        this.show(this.slides[this.currentElement]);

        clearTimeout(this.delayHideSetTimeOutControl);

        this.delayHideSetTimeOutControl = this.delayHide(this.slides[prev], 1100);

        this.slides[this.currentElement].classes = ['active', 'backward'];

        if (this.autoPlay)
        {
          this.auto(this.intervalTime);
        }
    }

    removeClasses(){
        for (let i = 0; i < this.number; i++){
            this.slides[i].classes = {};
        }
    }
    forWard(){

        if (!this.autoPlay){
          clearInterval(this.interval);
          this._forWard();
        }

        if (this.autoPlay)
        {
          this.auto(this.intervalTime);
        }
    }
    private _forWard(){
        this.currentElement = 1 + this.currentElement;

        if (this.currentElement >= this.number){
            this.currentElement = 0;
        }
        this.removeClasses();
        const prev = this.currentElement === 0 ? this.number - 1 : this.currentElement - 1;

        console.log(this.slides[prev]);
        this.slides[prev]['classes'] = ['animateBack'];

        this.show(this.slides[prev]);
        this.show(this.slides[this.currentElement]);

        clearTimeout(this.delayHideSetTimeOutControl);
        this.delayHideSetTimeOutControl = this.delayHide(this.slides[prev], 1100);

        this.slides[this.currentElement].classes = ['active', 'forward'];
    }
    auto(ms){
        this.autoPlay = true;
        this.intervalTime = ms;
        this.interval = setInterval(this._forWard.bind(this), ms);
    }
    delayHide(el, ms){
        return setTimeout(() => el.hidden = true, ms);
    }
    show(el){
        el.hidden = false;
    }
}


@Component({
  selector: 'print-slide',
  template:
  `
    <div *ngIf="meta.sType=='div'" [innerHtml]="meta.content | safeHtml">

    </div>
    <img [src]="meta.imgSrc" *ngIf="meta.sType=='img'" />
  `
})

export class PrintSlideComponent{
@Input('meta') meta: any;
constructor(){ }
}



