import { Activity, baseUrl } from "../typesandconst/typesandconst"
import { getActivities1 } from "./activityApi"

describe("testing async code", () => {
    it("testing first element - wrong way", () => {
        function callback(data: Activity[]) {
            expect(data[0]).toStrictEqual({ id: 0, text: "learning", completed: false })
        }
        //just because getActivities1 returned. jest consider the test success!
        getActivities1(baseUrl, callback);
    })
    it("testing first element - right way", done => {
        function callback(data: Activity[]) {
            try {
                expect(data[0]).toStrictEqual({ id: 0, text: "learning", completed: false })
                done()
            } catch (e) {
                done(e)
            }
            
        }
        //just because getActivities1 returned. jest consider the test success!
        getActivities1(baseUrl, callback);
    })
    it("testing first element - right way using promise", () => {

        return getActivities1(baseUrl).then(data => {
            expect(data[0]).toStrictEqual({ id: 0, text: "learning", completed: false })
        })
    })
    it("testing first element - right way using promise - reject", () => {

        return getActivities1("http://localhost:5000/activities").catch((e: Error) => {
            expect(e.message).toMatch("Network request failed")
        })
    })
    it("testing first element - right way using promise - resolves", () => {

        return expect(getActivities1("http://localhost:3500/activities"))
            .resolves.toStrictEqual([
                { id: 0, text: "learning", completed: false },
                { id: 1, text: "walking", completed: true },
                { id: 2, text: "eating", completed: false },
                { id: 3, text: "sleeping", completed: true }])           
    })
    it("testing first element - right way using promise - reject", () => {

        return expect(getActivities1("http://localhost:5000/activities"))
            .rejects.toThrowError("Network request failed")
    })
    it("testing first element - right way using async/await", async() => {

        const data = await getActivities1("http://localhost:3500/activities")
            
                expect(data).toStrictEqual([
                    { id: 0, text: "learning", completed: false },
                    { id: 1, text: "walking", completed: true },
                    { id: 2, text: "eating", completed: false },
                    { id: 3, text: "sleeping", completed: true }])
            })
    
})