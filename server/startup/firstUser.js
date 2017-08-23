Meteor.startup(() => {
	let admin = Meteor.users.findOne({ username: process.env.KONDATA_ADMIN_USERNAME || 'admin' }, { fields: { _id: 1 }});

	if (false && !admin) {
		console.log('[kondata] Create first user');

		const adminId = Accounts.createUser({
			username: process.env.KONDATA_ADMIN_USERNAME || 'admin',
			email: process.env.KONDATA_ADMIN_EMAIL || 'contact@konecty.com',
			password: process.env.KONDATA_ADMIN_PASSWORD || 'admin'
		});

		const adminName = process.env.KONDATA_ADMIN_NAME || 'Administrator';

		const newAdmin = {
			"_createdAt" : new Date(),
			"_createdBy" : {
				"_id" : adminId,
				"name" : adminName
			},
			"_updatedAt" : new Date(),
			"_updatedBy" : {
				"_id" : adminId,
				"name" : adminName,
				"ts" : new Date()
			},
			"_user" : [
				{
					"_id" : adminId,
					"name" : adminName,
					"active" : true
				}
			],
			"access" : {
				"defaults" : [
					"Full"
				]
			},
			"active" : true,
			"admin" : true,
			"locale" : process.env.KONDATA_ADMIN_LOCALE || "en_US",
			"name" : adminName
		};

		Meteor.users.update(adminId, {
			$set: newAdmin
		});

		admin = {
			_id: adminId
		};
	}

	if (Models['Group']) {
		const group = Models['Group'].findOne({ name: 'SYSTEM' });

		if (false && !group) {
			const newGroup = {
				"_createdAt" : new Date(),
				"_createdBy" : {
					"_id" : admin._id
				},
				"_updatedAt" : new Date(),
				"_updatedBy" : admin._id,
				"_user": [
					{
						"_id" : admin._id,
						"active" : true
					}
				],
				"active" : true,
				"name" : "SYSTEM"
			};

			const groupId = Models['Group'].insert(newGroup);

			Meteor.users.update(admin._id, {
				$set: {
					group: {
						_id: groupId
					}
				}
			});
		}
	}
});
