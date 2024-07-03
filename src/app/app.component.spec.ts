import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd, Event } from '@angular/router';
import { AppComponent } from './app.component';
import { of, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let routerEventsSubject: Subject<Event>;

  beforeEach(async () => {
    routerEventsSubject = new Subject<Event>();
    
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router.events, 'pipe').and.returnValue(routerEventsSubject.pipe(filter(event => event instanceof NavigationEnd)));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title "Electricity Tariffs"', () => {
    expect(component.title).toEqual('Electricity Tariffs');
  });

  it('should update current route', fakeAsync(() => {
    const testUrl = '/test';
    const navigationEnd = new NavigationEnd(0, testUrl, testUrl);
    
    routerEventsSubject.next(navigationEnd);
    tick();

    expect(component.currentRoute).toBe(testUrl);
  }));
});
