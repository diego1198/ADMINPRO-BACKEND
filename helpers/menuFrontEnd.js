const getMenuFrontEnd = (role = 'USER_ROLE') => {
    const menu = [
        {
            title: 'Dashboard',
            icon: 'mdi mdi-gauge',
            submenu: [
                { title: 'Main', url: '/' },
                { title: 'Progress Bar', url: '/dashboard/progress' },
                { title: 'Graphs', url: '/dashboard/graph1' },
                { title: 'Promises', url: '/dashboard/promises' },
                { title: 'Rxjs', url: '/dashboard/rxjs' },
            ],
        },
        {
            title: 'Maintenance',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                /* { title: 'Users', url: '/maintenance/users' }, */
                { title: 'Hospitals', url: '/maintenance/hospitals' },
                { title: 'Doctors', url: '/maintenance/doctors' },
            ],
        },
    ]

    if(role === 'ADMIN_ROLE'){
        menu[1].submenu.unshift({ title: 'Users', url: '/maintenance/users' });
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}