export namespace main {
	
	export class ComputerItem {
	    id: string;
	    node_name: string;
	    serialnumber: string;
	    room: string;
	    manufacturer: string;
	    cpu_model: string;
	    fio_user: string;
	    user_phone: string;
	    ip: string;
	    mac: string;
	    department: string;
	    type: string;
	    os: string;
	    osrelease: string;
	    created_at: string;
	    updated_at: string;
	
	    static createFrom(source: any = {}) {
	        return new ComputerItem(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.node_name = source["node_name"];
	        this.serialnumber = source["serialnumber"];
	        this.room = source["room"];
	        this.manufacturer = source["manufacturer"];
	        this.cpu_model = source["cpu_model"];
	        this.fio_user = source["fio_user"];
	        this.user_phone = source["user_phone"];
	        this.ip = source["ip"];
	        this.mac = source["mac"];
	        this.department = source["department"];
	        this.type = source["type"];
	        this.os = source["os"];
	        this.osrelease = source["osrelease"];
	        this.created_at = source["created_at"];
	        this.updated_at = source["updated_at"];
	    }
	}

}

