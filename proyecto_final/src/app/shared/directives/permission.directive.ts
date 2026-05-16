import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPermission]',
  standalone: true
})
export class PermissionDirective {
  @Input('appPermission') role!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.role !== 'admin') {
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
    }
  }
}
