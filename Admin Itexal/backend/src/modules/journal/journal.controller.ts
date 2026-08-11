import { Controller, Get } from '@nestjs/common';
import { JournalService } from './journal.service';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get()
  async lister() {
    return this.journalService.lister();
  }
}
