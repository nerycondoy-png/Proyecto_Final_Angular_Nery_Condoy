import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[highlightInvalid]',
  standalone: true
})
export class HighlightInvalidDirective {
  @Input() set highlightInvalid(condition: boolean) {
    if (condition) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid red');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'border');
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}
}
