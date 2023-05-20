import '../extensions/uppy';
import './school';
import './dashboard';
import './search';
import '../extensions/summernote';
import '../extensions/clipboard';
import './assignment';
import './course';
import intlTelInput from 'intl-tel-input';
import { Application } from 'stimulus';
import ImportController from "./import_controller";
import InviteStudentsController from "./invite-students_controller";
import TeachersController from "./teachers_controller";
import TeacherFormController from "./teacher-form_controller";
import SchoolProfileController from "./dashboard/school_profile_controller";
import UserProfileController from "./dashboard/user-profile_controller";
import LicensesController from "./licenses_controller";
import ActivitiesController from "./activities_controller";
import StudentEditFormController from "./student-edit-form_controller";

const application = Application.start();
application.register("importer", ImportController);
application.register("invite-students", InviteStudentsController);
application.register("teachers", TeachersController);
application.register("teacher-form", TeacherFormController);
application.register("school-profile", SchoolProfileController);
application.register("user-profile", UserProfileController);
application.register("school-license", LicensesController);
application.register("activity", ActivitiesController);
application.register("student-edit-form", StudentEditFormController);