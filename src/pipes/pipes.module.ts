import { NgModule } from '@angular/core';
import { SafeUrlPipe } from './safe-url/safe-url';
@NgModule({
	declarations: [SafeUrlPipe],
	imports: [],
	exports: [SafeUrlPipe]
})
export class PipesModule {}
