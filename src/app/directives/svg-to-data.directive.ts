import {
  Directive,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[ngToSvgData]',
  standalone: false,
})
export class SvgToDataDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click')
  onClick(): void {
    const svgElement = this.el.nativeElement;
    if (svgElement.tagName.toLowerCase() === 'svg') {
      const svgJson = this.convertSvgToJsonWithAttributes(svgElement);
      console.log(JSON.stringify(svgJson));
    } else {
      console.error('The directive is not applied to an SVG element.');
    }
  }

  private convertSvgToJsonWithAttributes(element: HTMLElement): any {
    const json: any = {
      attributes: this.getAttributes(element),
      children: [],
    };

    Array.from(element.children).forEach((child: any) => {
      json.children.push(this.convertSvgToJson(child));
    });

    return json;
  }

  private convertSvgToJson(element: HTMLElement): any {
    const json: any = {
      tag: element.tagName,
      attributes: this.getAttributes(element),
      children: [],
    };

    Array.from(element.children).forEach((child: any) => {
      json.children.push(this.convertSvgToJson(child));
    });

    return json;
  }

  private getAttributes(element: HTMLElement): any {
    const attributes: any = {};
    Array.from(element.attributes).forEach((attr) => {
      attributes[attr.name] = attr.value;
    });
    return attributes;
  }
}
