import {sessions} from "@/infra/sessions";
import {handlers} from "@/infra/handlers";
import {stubs} from "@/infra/stubs";

import type {SessionService} from "@/infra/sessions/types.ts";
import type {HandlerService} from "@/infra/handlers/types.ts";
import type {StubService} from "@/infra/stubs/types.ts";

export type Infra = {
  sessions: SessionService;
  handlers: HandlerService;
  stubs: StubService
}

export const Infra = {
  sessions,
  handlers,
  stubs
}
