//初始資料庫結構
const dbData = [
	{
		dbName: "masterDB",					//資料庫名稱
		version: 1,							//資料庫版本號,當結構發生變化時
		tables: [							//表
			{
				name: "SYS_favorites",		//表名稱
				keyPath: "uid",				//主鍵
				autoIncrement: false,		//主鍵是否自增
				index: [					//索引
					{
						name: "name_index",	//索引名稱
						key: "name"			//索引key
					}
				]
			},
			{
				name: "SYS_keyword",
				keyPath: "id"
			}
		]
	},
	{
		dbName: "guestDB",
		version: 1,
		tables: [
			{
				name: "MY_demo",
				keyPath: "id"
			}
		]
	}
]

// 使用示例
// import DB from '@/utils/db'

// 初始化創建資料庫 一般在項目啟動時就執行了
// await DB.create()

// 打開某個資料庫，返回資料庫實例
// const database = await DB.open("dbName")

// 在打開的資料庫中添加資料到tablenName表
// await database.add("tablenName", data)

// 查詢
// await database.get("tablenName", key)

// 查詢 根據索引
// await database.indexGet("tablenName", "indexName", indexVal)

// 修改
// await database.put("tablenName", data)

// 刪除
// await database.delete("tablenName", key)

// 獲取所有
// await database.getAll("tablenName")

// 清空某個表資料
// await database.clear("tablenName")

// 獲取某個表資訊
// database.getTable("tablenName")

// 獲取所有表
// database.getTables()

// 關閉資料庫連接
// database.close()


export default {
	//建立資料庫，表，初始資料
	create() {
		var promiseArray = []
		const addDB = db => {
			return new Promise((resolve, reject) => {
				const request = indexedDB.open(db.dbName, db.version)
				request.onupgradeneeded = e => {
					const thisDB = e.target.result
					db.tables.forEach(item => {
						let table = null
						if (thisDB.objectStoreNames.contains(item.name)) {
							//已存在表，刪除舊index
							table = e.target.transaction.objectStore(item.name)
							table.indexNames.length>0 && table.indexNames.forEach(indexName => {
								table.deleteIndex(indexName)
							})
						}else{
							//創建新的表
							table = thisDB.createObjectStore(item.name, {
							    keyPath: item.keyPath,
								autoIncrement: item.autoIncrement
							})
						}
						//建立index
						item.index && item.index.forEach(ind => {
							table.createIndex(ind.name, ind.key, { unique: false })
						})
					})
				},
				request.onsuccess = e => {
					return resolve(e.target.result)
				}
				request.onerror = e => {
					return reject(e)
				}
			})
		}
		dbData.forEach(db => {
			promiseArray.push(addDB(db))
		})
		return new Promise((resolve, reject) => {
			Promise.all(promiseArray).then((e) => {
				resolve(e)
			}).catch(e => {
				reject(e)
			})
		})
	},
	//所有資料庫
	databases(){
		return indexedDB.databases()
	},
	//打開資料庫
	open(dbName){
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(dbName)
			request.onsuccess = e => {
				const database = new this.database(e.target.result)
				resolve(database)
			}
			request.onerror = e => {
				reject(e)
			}
		})
	},
	//刪除資料庫
	deleteDB(dbName){
		return indexedDB.deleteDatabase(dbName)
	},
	//資料庫類
	database: function (IDBDatabase) {
		this.IDBDatabase = IDBDatabase

		/**
		 * 添加行資料
		 * @param {string} tableName 表名
		 * @param {object} data 資料
		 * @returns {promise}
		 */
		this.add = (tableName, data) => {
			return new Promise((resolve, reject) => {
				const request = IDBDatabase.transaction([tableName], 'readwrite').objectStore(tableName).add(data)
				request.onsuccess = e => {
					resolve(e)
				}
				request.onerror = e => {
					reject(e)
				}
			})
		}

		/**
		 * 修改行資料，未查詢到就新增
		 * @param {string} tableName 表名
		 * @param {object} data 資料
		 * @returns {promise}
		 */
		this.put = (tableName, data) => {
			return new Promise((resolve, reject) => {
				const request = IDBDatabase.transaction([tableName], 'readwrite').objectStore(tableName).put(data)
				request.onsuccess = e => {
					resolve(e)
				}
				request.onerror = e => {
					reject(e)
				}
			})
		}

		/**
		 * 刪除行
		 * @param {string} tableName 表名
		 * @param {string} key 主鍵
		 * @returns {promise}
		 */
		this.delete = (tableName, key) => {
			return new Promise((resolve, reject) => {
				const request = IDBDatabase.transaction([tableName], 'readwrite').objectStore(tableName).delete(key)
				request.onsuccess = e => {
					resolve(e)
				}
				request.onerror = e => {
					reject(e)
				}
			})
		}

		/**
		 * 根據主鍵獲取行
		 * @param {string} tableName 表名
		 * @param {string} key 主鍵
		 * @returns {promise}
		 */
		this.get = (tableName, key) => {
			return new Promise((resolve, reject) => {
				const request = IDBDatabase.transaction([tableName], 'readwrite').objectStore(tableName).get(key)
				request.onsuccess = () => {
					resolve(request.result || null)
				}
				request.onerror = e => {
					reject(e)
				}
			})
		}

		/**
		 * 根據索引獲取行
		 * @param {string} tableName 表名
		 * @param {string} indexName 索引庫名稱
		 * @param {string} indexVal 索引值
		 * @returns {promise}
		 */
		this.indexGet = (tableName, indexName, indexVal) => {
			return new Promise((resolve, reject) => {
				const request = IDBDatabase.transaction([tableName], 'readwrite').objectStore(tableName).index(indexName).get(indexVal)
				request.onsuccess = () => {
					resolve(request.result || null)
				}
				request.onerror = e => {
					reject(e)
				}
			})
		}

		/**
		 * 獲取所有行
		 * @param {string} tableName 表名
		 * @returns {promise}
		 */
		this.getAll = (tableName) => {
			return new Promise((resolve, reject) => {
				const request = IDBDatabase.transaction([tableName], 'readwrite').objectStore(tableName).getAll()
				request.onsuccess = () => {
					resolve(request.result || null)
				}
				request.onerror = e => {
					reject(e)
				}
			})
		}

		/**
		 * 清空表
		 * @param {string} tableName 表名
		 * @returns {promise}
		 */
		this.clear = (tableName) => {
			return new Promise((resolve, reject) => {
				const request = IDBDatabase.transaction([tableName], 'readwrite').objectStore(tableName).clear()
				request.onsuccess = e => {
					resolve(e)
				}
				request.onerror = err => {
					reject(err)
				}
			})
		}

		/**
		 * 獲取表資訊
		 * @returns {IDBObjectStore}
		 */
		this.getTable = (tableName) => {
			const request = IDBDatabase.transaction([tableName], 'readwrite').objectStore(tableName)
			return request
		}

		/**
		 * 獲取所有的表
		 * @returns {[IDBObjectStore]}
		 */
		this.getTables = () => {
			const tables = []
			for (let item of IDBDatabase.objectStoreNames) {
				tables.push(IDBDatabase.transaction([item], 'readwrite').objectStore(item))
			}
			return tables
		}

		/**
		 * 關閉資料庫連接
		 * @returns {}
		 */
		this.close = () => {
			return IDBDatabase.close()
		}
	}
}
