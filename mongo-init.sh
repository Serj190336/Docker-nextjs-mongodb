 mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB('admin');
    var appUser = '$MONGO_INITDB_USERNAME';
    var appPasswd = '$MONGO_INITDB_PASSWORD';
    var appDB = '$MONGO_INITDB_DATABASE';

    admin.auth(rootUser, rootPassword);
    db.createUser({user: appUser, pwd: appPasswd, roles: [{ role: "dbOwner", db: appDB}]});
EOF
