// Stores global dynamic objects that are not state but that are required
// throughout the application. Dependency injection would be a better solution
// but more complex and YAGNI at this point. However classes that make use of the
// registry should be designed in such a way that they can be converted to use
// dependency injection later on (eg. `BaseModel.db()`, `Synchroniser.api()`)

import { Database } from 'src/database.js'
import { WebApi } from 'src/web-api.js'

class Registry {

	static setDebugMode(v) {
		this.debugMode_ = v;
	}

	static debugMode() {
		if (this.debugMode_ === undefined) return false;
		return this.debugMode_;
	}

	static api() {
		if (this.api_) return this.api_;
		this.api_ = new WebApi('http://192.168.1.2');
		return this.api_;
	}

	static setDb(v) {
		this.db_ = v;
	}

	static db() {
		if (!this.db_) throw new Error('Accessing database before it has been initialised');
		return this.db_;
	}

}

export { Registry };