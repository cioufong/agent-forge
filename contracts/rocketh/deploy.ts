import {
  type Accounts,
  type Data,
  type Extensions,
  extensions,
} from "./config.js";

// re-export artifacts
import * as artifacts from "../generated/artifacts/index.js";
export { artifacts };

// create rocketh deploy functions
import { setupDeployScripts } from "rocketh";
const { deployScript } = setupDeployScripts<Extensions, Accounts, Data>(
  extensions,
);

export { deployScript };
