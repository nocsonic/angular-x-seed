import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {select, Store} from '@ngrx/store';
import {AppState} from '@app/store/reducers';
import * as fromSidebarSelectors from '../../store/selectors/sidebar.selector';
import * as fromSidebarActions from '../../store/actions/sidebar.action';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnInit {

  showSidenav: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.showSidenav = this.store.pipe(
      select(fromSidebarSelectors.getShowSidenav)
    );
  }

  onCloseSidenav(): void {
    this.store.dispatch(new fromSidebarActions.Close());
  }

  ngOnInit() {
  }

}
