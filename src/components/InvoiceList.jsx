import React from 'react';
import { Link } from 'react-router-dom';

export const InvoiceList = (props) => {
    // Sort by dueDate ascending and createDate decending
    const invoices = props.invoices.sort((a, b) => {
        if (a.remindDate === b.remindDate) {
            if (a.created === b.created) {
                return 0;
            }
            return (a.created < b.created) ? 1 : -1;
        }

        return (a.remindDate > b.remindDate)? 1: -1;
    });
    
    const containerHeight = 41 + (invoices.length * 40);

    return (
        <React.Fragment>
        <section style={{
                height: `${containerHeight}px`,
                overflow: 'hidden',
                marginBottom: '15px'
            }}
            className={props.className}
        >
            <h3 style={{position: "relative"}}>
                { props.title }&nbsp;
                <span style={{fontSize: "0.5em", position: "absolute", top: "0px"}} className="badge badge-info">
                    {invoices.length}
                </span>
            </h3>
            <svg version="1.1"
                width="100%"
                height="100%"
                fill="purple"
                xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0, 5)">
                {invoices.map((invoice, index) => {
                    const posX = 2;
                    const posY = index * 40;
                    const prevPosY = ((index - 1) * 40) + 21;

                    return (
                        <g key={invoice.id}>
                            {
                                (index > 0) &&
                                <path d={`M${12} ${prevPosY} V ${posY} Z`} fill="transparent" stroke="#89C5E3" strokeWidth="4" />
                            }
                            <g style={{ cursor: "pointer" }}
                                transform={`translate(${posX}, ${posY})`}
                            >
                                <circle onClick={(_) => { props.onSelect(invoice.id); }} cx="10" cy="10" r="10" strokeWidth="2" stroke="#002B7F" fill="transparent" />
                                <text x="25" y="15" >
                                    <tspan fill="purple" className="text-date">{ invoice.remindDate }</tspan>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Link style={{textDecoration: "none"}} 
                                        to={`/invoices/${invoice.id}`}>
                                        <tspan fontSize="20" fill="black" >
                                            <tspan>{invoice.title}</tspan>
                                            &nbsp;&nbsp;
                                            <tspan fontWeight="200" fill="black">{invoice.amount} €</tspan>
                                        </tspan>
                                    </Link>
                                </text>
                            </g>
                        </g>
                    )
                })}
                </g>
            </svg>
        </section>
        </React.Fragment>
    );
};