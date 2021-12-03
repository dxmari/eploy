import Table from 'tty-table';
import { ApplicationList } from '../interfaces';

let options = {
    borderStyle: "solid",
    borderColor: "blue",
    headerAlign: "center",
    defaultValue: '-',
    align: "left",
    color: "white",
    truncate: "...",
    width: "90%"
}

export const listApplications = (rowValues: Array<ApplicationList>) => {
    let newRowValues: Array<Array<any>> = [], temp = [];
    let header: any = [{
        alias: "PID",
        value: "pid",
        headerColor: "cyan",
        color: "yellow",
        align: "center",
        width: 5
    }, {
        alias: "APP_NAME",
        value: "app_name",
        headerColor: "cyan",
        color: "yellow",
        align: "center",
        width: 25
    }, {
        alias: "✔ SUCCESS_COUNT",
        value: "success_count",
        headerColor: "cyan",
        color: "white",
        align: "center",
        width: 18,
        formatter: function (value: any): any {
            let thisObj: any = this;
            return thisObj.style(value, "green", "bold")
        }
    }, {
        alias: "✖ FAIL_COUNT",
        value: "fail_count",
        headerColor: "cyan",
        color: "white",
        align: "center",
        width: 15,
        formatter: function (value: any): any {
            let thisObj: any = this;
            return thisObj.style(value, "red", "bold")
        }
    }, {
        alias: "LAST_RUN_STATUS",
        value: "last_run_status",
        headerColor: "blue",
        color: "green",
        align: "center",
        width: 20,
        formatter: function (value: any): any {
            let thisObj: any = this;
            return (value === 'failure') ? thisObj.style('✖ ' + value, "red", "bold") : thisObj.style('✔ ' + value, "green", "bold")
        }
    }, {
        alias: "LAST_RUN_AT",
        value: "last_run_at",
        headerColor: "blue",
        color: "yellow",
        align: "center",
        width: 28,
        formatter: function (value: any): any {
            if (!value) {
                value = new Date().toJSON()
            }
            return value;
        }
    }]
    rowValues.forEach((value: any) => {
        temp = header.map((e: any) => value[e.value]);
        newRowValues.push(temp)
    })

    const rows = getRows(header.map((e: any) => e.value), newRowValues);
    const out = Table(header, rows, options).render();
    return out;
}

export const serviceStatus = (rowValues: Array<any>) => {
    let header = ["PID", "Service name", "Service path", "Starts at", "Last restarts at", "Status"];
    const [headers, rows] = changeHorizondalTable(header, rowValues);
    const out = Table(headers, rows, options).render();
    return out;
}

function changeHorizondalTable(headers: Array<any>, rowValues: Array<any>) {
    var new_header: Array<any> = [{
        value: "",
        headerColor: "cyan",
        color: "yellowBright",
        align: "right",
    }, {
        value: "",
        headerColor: "cyan",
        color: "greenBright",
        align: "left",
    }], new_rows: Array<any> = [];

    headers.forEach((val, key) => {
        new_rows.push([val, rowValues[key]])
    })
    return [new_header, new_rows]
}

function getRows(rowHeaders: Array<string>, rowValues: Array<Array<any>>): Array<any> {
    var result: Array<any> = [], temp: any = {};
    rowValues.forEach((val, key) => {
        temp = {};
        rowHeaders.forEach((head, itr) => {
            temp[head] = val[itr]
        })
        result.push(temp);
    })
    return result;
}
