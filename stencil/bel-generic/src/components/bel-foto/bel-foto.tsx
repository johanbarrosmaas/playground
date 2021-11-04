import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'bel-foto',
  styleUrl: 'bel-foto.css',
  shadow: true,
})
export class BelFoto {
  @Prop() width: number;
  @Prop() height: number;
  @Prop() path: string;

  render() {
    return (
      <Host>
        <image 
          width={this.width}
          height={this.height}
          from={this.path}  
        >
        </image>
      </Host>
    );
  }
}
