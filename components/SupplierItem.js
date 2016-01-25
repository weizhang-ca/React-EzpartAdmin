var React = require('react');

var SupplierItem = React.createClass({
  render: function(){return <li>
          <table>
            <tr>
            <td><div className="view">{this.props.supplier.supplierName}</div></td>
            <td><div className="view">{this.props.supplier.address}</div></td>
            <td><div className="view">{this.props.supplier.city}</div></td>
            <td><div className="view">{this.props.supplier.phone}</div></td>
            <td><div className="view">{this.props.supplier.email}</div></td>
          </tr>
          </table>
        </li>;
      }
});

module.exports = SupplierItem;
