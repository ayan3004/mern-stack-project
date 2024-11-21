const userSchema = require('../model/user')
const courseSchema = require('../model/course')

module.exports.createCourse = async (req,res)=>{
    try {
        req.body.teacherId = req.user._id
        const newCourse = await courseSchema.create(req.body)
        res.status(200).json({newCourse})
    } catch (error) {
        console.log(error);
        res.json(404).json({message : "Error creating while creating course"});
    }
}

module.exports.viewCourse = async (req,res)=>{
    try {   
        const course = await courseSchema.find({ teacherId : req.user._id});
        
        if(!course){
            return res.status(404).json({message : "Course not found"})
        }
        res.status(200).json({course})
    } catch (error) {
        console.log(error);
        res.json(500).json({message : "Error while viewing course"});
    }
}

module.exports.deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await courseSchema.findByIdAndDelete(req.query.id)
        if(!deletedCourse){
            return res.status(404).json({message : "Course not found"})
        }
        res.status(200).json({deletedCourse})
    } catch (error) {
        console.log(error);
        res.json(500).json({message : "Error while deleting course"});
    }
}

module.exports.editCourse = async (req, res) => {
    try {
        const updatedCourse = await courseSchema.findByIdAndUpdate(req.query.id, req.body)
        if(!updatedCourse){
            return res.status(404).json({message : "Course not found"})
        }
        res.status(200).json({updatedCourse})
    } catch (error) {
        console.log(error);
        res.json(500).json({message : "Error while updating course"});
    }
}

module.exports.enroll = async (req, res) => {
    try {
      const { courseId } = req.body; // Course ID from frontend
      const userId = req.user._id; // Authenticated user
  
      const user = await userSchema.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the course exists
      const course = await courseSchema.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      // Add course to user's enrolled list
      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }
  
      res.status(200).json({ message: "Enrolled successfully", course });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error enrolling in course" });
    }
  };
  