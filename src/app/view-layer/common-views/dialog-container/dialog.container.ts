import { Component,
         ViewChild,
         ViewContainerRef,
         ComponentRef,
         ComponentFactoryResolver,
         Injector } from '@angular/core';



@Component({
  moduleId: module.id,
  selector: 'dialog-container',
  templateUrl: 'dialog.container.html',
})


export class  DialogContainerComponent {
  @ViewChild('placeHolder', {read: ViewContainerRef}) private _placeHolder:any;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver) {
  }


  public loadComponent(aDialogComponent:DialogContainerComponent) {
    let cmp = this.createComponent(this._placeHolder.injector, aDialogComponent);

    // all inputs/outputs set? add it to the DOM ..
    this._placeHolder.insert(cmp.hostView);

  }

  public createComponent (vCref: Injector,  type:any): ComponentRef<any> {

    let factory = this._componentFactoryResolver.resolveComponentFactory(type);
    // vCref is needed cause of that injector..
     const injector:Injector = Injector.create({ providers: [], parent: vCref });

    // create component without adding it directly to the DOM
    let comp = factory.create(injector);

    return comp;
  }
}
