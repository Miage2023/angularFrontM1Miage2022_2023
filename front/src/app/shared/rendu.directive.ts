import { Directive, ElementRef } from "@angular/core";

@Directive({
	selector: "[appRendu]",
})

export class RenduDirective {
	constructor(el: ElementRef) {
		el.nativeElement.style.color = "black";
		el.nativeElement.style.border = "1px solid black";
		el.nativeElement.style.backgroundColor = "LightGreen";
	}
}