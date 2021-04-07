import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  ParamMap
} from '@angular/router';

@Component({
  selector: 'app-batchdetails',
  templateUrl: './batchdetails.component.html',
  styleUrls: ['./batchdetails.component.css'],
})
export class BatchdetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {
    this.batchName = this.router.getCurrentNavigation().extras.state.batchObject.batchName;

  }

  public batchId: number;
  public batchName: String;

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('batchId'));
    this.batchId = id;
  }
}
