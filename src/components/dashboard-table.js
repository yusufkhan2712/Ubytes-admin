import React from "react";
import { Table } from "react-bootstrap";
function DashboardTable({ rows }) {
  return (
    <div className="dashboard-table-block">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th># of orders</th>
            <th># of customers</th>
            <th>% of customers</th>
            <th>Avg. basket</th>
            <th>Total sales</th>
            <th>% Total orders</th>
            <th>ACV </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>New</td>
            <td>
              {
                rows?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                }).length
              }
            </td>
            <td>
              {
                rows?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                }).length
              }
            </td>
            <td>
              {
                rows?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                }).length
              }
            </td>
            <td>
              INR{" "}
              {rows
                ?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                })
                ?.reduce((acc, item) => {
                  return acc + item.totalPrice;

                  // return acc + item.totalPrice;
                }, 0)}
            </td>
            <td>
              INR{" "}
              {rows
                ?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                })
                ?.reduce((acc, item) => {
                  return acc + item.totalPrice;

                  // return acc + item.totalPrice;
                }, 0)}
            </td>
            <td>
              {
                rows?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                }).length
              }
            </td>
            <td>
              INR{" "}
              {rows
                ?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                })

                ?.reduce((acc, item) => {
                  return acc + item.totalPrice;
                }, 0)}
            </td>
          </tr>
          <tr>
            <td>Returning</td>
            <td>
              {/* rows?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                }).length */}
            </td>
            <td>
              {/*  rows?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                }).length */}
            </td>
            <td>
              {/* rows?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                }).length */}
            </td>
            <td>
              INR{" "}
              {/* rows
                ?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                })
                ?.reduce((acc, item) => {
                  return acc + item.totalPrice;

                  // return acc + item.totalPrice;
                }, 0) */}
            </td>
            <td>
              INR{" "}
              {/* rows
                ?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                })
                ?.reduce((acc, item) => {
                  return acc + item.totalPrice;

                  // return acc + item.totalPrice;
                }, 0) */}
            </td>
            <td>
              {/* rows?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                }).length */}
            </td>
            <td>
              INR{" "}
              {/* rows
                ?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                })

                ?.reduce((acc, item) => {
                  return acc + item.totalPrice;
                }, 0) */}
            </td>
          </tr>
          <tr>
            <td>
              <b>Total</b>
            </td>
            <td>
              {
                rows?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                }).length
              }
            </td>
            <td>
              {
                rows?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                }).length
              }
            </td>
            <td>
              {
                rows?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                }).length
              }
            </td>
            <td>
              INR{" "}
              {rows
                ?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                })
                ?.reduce((acc, item) => {
                  return acc + item.totalPrice;

                  // return acc + item.totalPrice;
                }, 0)}
            </td>
            <td>
              INR{" "}
              {rows
                ?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                })
                ?.reduce((acc, item) => {
                  return acc + item.totalPrice;

                  // return acc + item.totalPrice;
                }, 0)}
            </td>
            <td>
              {
                rows?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                }).length
              }
            </td>
            <td>
              INR{" "}
              {rows
                ?.filter((row) => {
                  return (
                    new Date(row.at.toDate()).getTime() >=
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000
                  );
                })

                ?.reduce((acc, item) => {
                  return acc + item.totalPrice;
                }, 0)}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default DashboardTable;
