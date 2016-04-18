var Profile=require('../models/Profile');
var Cookies= require('js-cookie');

var profileViewModel=(function(){
	var vm={}; 
	vm.init=function()
	{
		vm.listP=new Profile.profilelist();
		vm.listHtl=new Profile.profileHtllist();

		vm.first_name=m.prop("");
		vm.last_name=m.prop("");
		vm.city=m.prop("");
		vm.state=m.prop("");
		vm.country=m.prop("");
		vm.address=m.prop("");
		vm.phoneNo=m.prop("");
		vm.gender=m.prop("");
		vm.DOB=m.prop("");
		vm.pinCode=m.prop("");
		vm.UserID=m.prop("");

		vm.first_name1=m.prop("");
		vm.last_name1=m.prop("");
		vm.city1=m.prop("");
		vm.state1=m.prop("");
		vm.country1=m.prop("");
		vm.address1=m.prop("");
		vm.phoneNo1=m.prop("");
		vm.gender1=m.prop("");
		vm.DOB1=m.prop("");
		vm.pinCode1=m.prop("");
		vm.UserID1=m.prop("");

		vm.UserID2=m.prop("");
		vm.Place=m.prop("");
		vm.Description=m.prop("");
		vm.Altitude=m.prop("");
		vm.Temperature=m.prop("");
		vm.Season=m.prop("");
		vm.Language_Spoken=m.prop("");
		vm.Clothing=m.prop("");
		vm.State=m.prop("");
		vm.Tourism_Office=m.prop("");
		vm.file=m.prop("");

		vm.place=m.prop("");
		vm.Hotel_name=m.prop("");
		vm.Address=m.prop("");
		vm.Type_of_hotel=m.prop("");
		vm.Room_price=m.prop("");
		vm.priceDeluxe=m.prop("");
		vm.priceStandard=m.prop("");
		vm.Email_ID=m.prop("");
		vm.Phone_no=m.prop("");
		vm.Website=m.prop("");
		vm.State=m.prop("");

		vm.res=m.prop("");
		vm.resU=m.prop("");

		vm.loged=function()
		{
			vm.listP.pop();
			vm.listP.push(Cookies.get("data"));
			a=Cookies.get('data');
			var obj = JSON.parse(a);

			m.request({
				 method: "POST",
				 url: "http://localhost:3000/api/userprofile",
				 data:{
				 	cookieData:obj
				 }
			}).then(function(data){
				if(data!=undefined){
					vm.first_name1=data.first_name,
					vm.last_name1=data.last_name,
					vm.city1=data.city,
					vm.state1=data.state,
					vm.country1=data.country,
					vm.address1=data.address,
					vm.phoneNo1=data.phoneNo,
					vm.gender1=data.gender,
					vm.DOB1=data.DOB,
					vm.pinCode1=data.pinCode,
					vm.UserID1=data.UserID
				}				
			})			
		}


			
		vm.update=function()
		{
			cookieData=Cookies.get("data")
			a=JSON.parse(cookieData)
			UserID=a._id;
			console.log(vm.gender());

			m.request({
				 method: "POST",
				 url: "http://localhost:3000/api/profile",
				 data:{
				 	first_name:vm.first_name(),
				 	last_name:vm.last_name(),
				 	city:vm.city(),
				 	state:vm.state(),
				 	country:vm.country(),
				 	address:vm.address(),
				 	phoneNo:vm.phoneNo(),
				 	gender:vm.gender(),
				 	DOB:vm.DOB(),
				 	pinCode:vm.pinCode(),
				 	UserID:UserID
				 }
			}).then(function(data){
				vm.res=data;
			})
		}



		vm.hotel=function()
		{
			a=Cookies.get('data');
			var obj = JSON.parse(a);
			var id=obj._id;

			m.request({
				 method: "POST",
				 url: "http://localhost:3000/api/hotels/details",
				 data:{
				 	UserID:id
				 }
			}).then(function(data){
				vm.listP.splice(0,vm.listP.length);
				for (var i = 0; i <=data.length - 1; i++) {
					vm.listP.push(data[i]);			
				}					
			})	
		}


		vm.cancelBooking=function(e)
		{
			var id=e._id;
			m.request({
				 method: "POST",
				 url: "http://localhost:3000/api/hotels/CancelBooking",
				 data:{
				 	id:id
				 }
			}).then(function(data){
					
				vm.hotel();
			})
			
		}



		//user logout
		vm.logout=function()
		{ 
			var a=Cookies.get("data");
			if(a!=null) {	
				Cookies.remove("data");
				vm.response=("User Logged Out");
				m.route("/login");
			} else {
				vm.response=("No User Logged In");
			}	
		}

		vm.userShow=function()
		{
			m.request({
				 method: "GET",
				 url: "http://localhost:3000/api/user",
			}).then(function(data){
				vm.listP.splice(0,vm.listP.length);
				for (var i = 0; i <=data.length - 1; i++) {
					vm.listP.push(data[i]);			
				}					
			})	
		}

		vm.userHotels=function()
		{

			m.request({
				 method: "POST",
				 url: "http://localhost:3000/api/hotels/details",
				 data:{
				 	UserID:vm.UserID2()
				 }
			}).then(function(data){
				vm.listHtl.splice(0,vm.listHtl.length);
				for (var i = 0; i <=data.length - 1; i++) {
					vm.listHtl.push(data[i]);			
				}					
			})	
		}

		vm.deleteUser=function(e)
		{
			m.request({
				 method: "POST",
				 url: "http://localhost:3000/api/users/delete",
				 data:{
				 	UserID:e._id
				 }
			}).then(function(data){
				vm.res(data);					
			})	
		}


		vm.deleteBooking=function(e)
		{
			m.request({
				 method: "POST",
				 url: "http://localhost:3000/api/hotels/delete",
				 data:{
				 	id:e._id
				 }
			}).then(function(data){
				vm.userHotels();					
			})
		}


		vm.destinationUpdate=function()
		{

			var x=document.getElementById('file').files;
			var url="/images/destination/"+x[0].name;			
			
			m.request({
				 method: "POST",
				 url: "http://localhost:3000/api/destination/create",
				 data:{
				 	Place:vm.Place(),
				 	Description:vm.Description(),
				 	Altitude:vm.Altitude(),
				 	Temperature:vm.Temperature(),
				 	Clothing:vm.Clothing(),
				 	Season:vm.Season(),
				 	Language_Spoken:vm.Language_Spoken(),
				 	Tourism_Office:vm.Tourism_Office(),
				 	State:vm.State(),
				 	url:url	
				 }
			}).then(function(data){
				vm.res=data;
			})	
		}


		vm.upload=function()
		{
			var file=new FormData;
			var x=document.getElementById('file').files;
			for (var i = 0; i < x.length; i++) {
				file.append("file" + i, x[i])
			}

			m.request({
				method: "POST",
				url: "http://localhost:3000/api/destination/upload",
				data: file,
				serialize: function(value) {return value}
			}).then(function(data)
			{
				vm.resU=data;
			})
			
		}		


		vm.htlUpload=function()
		{
			var file=new FormData;
			var x;
			var first=document.getElementById('file1').files
			var second=document.getElementById('file2').files
			var third=document.getElementById('file3').files
			var fourth=document.getElementById('file4').files
			var fifth=document.getElementById('file5').files

			if(first[0]!=null) { x=first } 
			if(second[0]!=undefined) {	x=second }
			if(third[0]!=undefined)	{	x=third  }
			if(fourth[0]!=undefined) {	x=fourth }
		    if(fifth[0]!=undefined) {	x=fifth }

			for (var i = 0; i < x.length; i++) {
				file.append("file" + i, x[i])
			}

			m.request({
				method: "POST",
				url: "http://localhost:3000/api/hotels/upload",
				data: file,
				//simply pass the FormData object intact to the underlying XMLHttpRequest, instead of JSON.stringify'ing it
				serialize: function(value) {return value}
			}).then(function(data)
			{
				vm.resU=data;
			})
			
		}

		vm.hotelUpdate=function()
		{
			var urlf1=document.getElementById('file1').files;
			var urlf2=document.getElementById('file2').files;
			var urlf3=document.getElementById('file3').files;
			var urlf4=document.getElementById('file4').files;
			var urlf5=document.getElementById('file5').files;
			
			var url="/images/hotel/"+urlf1[0].name;
			var url1="/images/hotel/"+urlf2[0].name;
			var url2="/images/hotel/"+urlf3[0].name;			
			var url3="/images/hotel/"+urlf4[0].name;
			var url4="/images/hotel/"+urlf5[0].name;
			
			m.request({
				 method: "POST",
				 url: "http://localhost:3000/api/hotels/create",
				 data:{
				 	place:vm.place(),
				 	Hotel_name:vm.Hotel_name(),
				 	Address:vm.Address(),
				 	Type_of_hotel:vm.Type_of_hotel(),
				 	Room_price:vm.Room_price(),
				 	priceDeluxe:vm.priceDeluxe(),
				 	priceStandard:vm.priceStandard(),
				 	Email_ID:vm.Email_ID(),
				 	Website:vm.Website(),
				 	Phone_no:vm.Phone_no(),
				 	State:vm.State(),
				 	url:url,
				 	url1:url1,
				 	url2:url2,
				 	url3:url3,
				 	url4:url4	
				 }
			}).then(function(data){
				vm.res=data;
			})	
		}
	}
	return vm;
}())

module.exports=profileViewModel;	
