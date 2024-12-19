import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[ngFromSvgData]',
  standalone: false,
})
export class SvgFromDataDirective implements OnChanges{
  @Input('ngFromSvgData') ngFromSvgData!: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ngFromSvgData'] && this.ngFromSvgData) {
      const svgElement = this.el.nativeElement;
      if (svgElement.tagName.toLowerCase() === 'svg') {
        this.clearSvg(svgElement);
        this.populateSvg(svgElement, this.ngFromSvgData);
      } else {
        console.error('The directive is not applied to an SVG element.');
      }
    }
  }

  private clearSvg(svgElement: HTMLElement): void {
    while (svgElement.firstChild) {
      svgElement.removeChild(svgElement.firstChild);
    }
  }

  private populateSvg(svgElement: HTMLElement, json: any): void {
    // Set attributes for the root SVG element
    if (json.attributes) {
      Object.keys(json.attributes).forEach((key) => {
        this.renderer.setAttribute(svgElement, key, json.attributes[key]);
      });
    }

    // Add child elements recursively
    if (json.children && Array.isArray(json.children)) {
      json.children.forEach((child: any) => {
        const childElement = this.renderer.createElement(child.tag, 'svg');
        this.setAttributes(childElement, child.attributes);
        this.populateSvg(childElement, child);
        this.renderer.appendChild(svgElement, childElement);
      });
    }
  }

  private setAttributes(element: any, attributes: any): void {
    if (attributes) {
      Object.keys(attributes).forEach((key) => {
        this.renderer.setAttribute(element, key, attributes[key]);
      });
    }
  }
}