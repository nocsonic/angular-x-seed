import {Action} from '@ngrx/store';

export const OPEN = '[Sidebar] Open';
export const CLOSE = '[Sidebar] Close';

export class Open implements Action {
  readonly type: string = OPEN;
}

export class Close implements Action {
  readonly type: string = CLOSE;
}

export type SidebarAction = Open | Close;
