/* eslint-disable @next/next/no-img-element */
import Backend from '@/components/admin/Backend';
import { SectionHeader } from '@/components/layout/Header';
import React from 'react';

const MonthlyReport = () => {
  return (
    <Backend>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            {/* Monthly Column Overview */}
            <section className="mb-4">
              <h4 className="mb-3">Monthly Report Sheet Documentation</h4>
              <p>
                This sheet is used for planning, reporting, and tracking monthly
                and weekly tasks. Use this sheet to create your monthly plan,
                which will break down further for weekly reports.
              </p>
            </section>

            <img
              src={`/assets/img/scribes/monthly-report/sheet.png`}
              alt="1"
              className="img-fluid"
            />

            {/* Column Explanations */}
            <section>
              {/* Checkbox */}
              <div className="my-3">
                <SectionHeader small className="mt-6">
                  1. Checkbox
                </SectionHeader>
                {/* <h5>1. Checkbox</h5> */}
                <p>
                  This is used to mark tasks as completed with 1 click. When
                  checked, it will strike through the row text, but it won’t
                  affect any other values. This helps in quickly closing out
                  completed tickets.
                </p>
                <AlertAttention type="success">
                  Use this to quickly close out tasks you have fully completed
                </AlertAttention>
              </div>

              {/* Category */}
              <div className="my-3">
                <SectionHeader small className="mt-6">
                  2. Category
                </SectionHeader>
                <p>
                  This is used to define the category of each task here to keep
                  things organized. You can group tasks into categories like
                  &quot;Highrachy,&quot; &quot;Blissville,&quot;
                  &quot;Design,&quot; or &quot;Project&quot; to help other team
                  members quickly identify task types.
                </p>
                <AlertAttention type="success">
                  Use consistent categories to simplify filtering and searching
                  for tasks.
                </AlertAttention>
              </div>

              {/* Task / Story / Action */}
              <div className="my-4">
                <SectionHeader small className="mt-5">
                  3. Task / Story / Action
                </SectionHeader>
                <p>
                  This is used to describe the task or action here.
                  <ul>
                    <li>
                      a <strong>task</strong> is a single action;
                    </li>
                    <li>
                      a <strong>story</strong> is a high-level description of a
                      requirement;
                    </li>
                    <li>
                      an <strong>action</strong> is a specific step needed.
                    </li>
                  </ul>
                  Ensure to always keep your descriptions clear, concise, and
                  easy for others to understand.
                </p>

                <AlertAttention type="success">
                  <ul>
                    <li>Use simple language to describe each item.</li>
                    <li>
                      Example: “Set up database” is clearer than “Database.”
                    </li>
                  </ul>
                </AlertAttention>
              </div>

              {/* Type */}
              <div className="my-3">
                <SectionHeader small className="mt-5">
                  4. Type
                </SectionHeader>
                <p>Select the task type from the dropdown list:</p>
                <ul>
                  <li>
                    <strong>One-Off:</strong> A standalone task that doesn’t
                    recur or link to other tasks.
                  </li>
                  <li>
                    <strong>Main Task:</strong> Parent tasks with multiple
                    subtasks underneath. Main tasks are only marked complete
                    when all subtasks are done.
                  </li>
                  <li>
                    <strong>Subtask:</strong> Part of a larger main task.
                    Subtasks help in breaking down complex tasks for better
                    tracking.
                  </li>
                  <li>
                    <strong>High Priority:</strong> Select this for urgent
                    tasks. High-priority items change the progress bar color,
                    indicating their importance.
                  </li>
                  <li>
                    <strong>From Last Month:</strong> Tasks carried over from
                    the previous month. Helps in tracking ongoing items.
                  </li>
                  <li>
                    <strong>New:</strong> Tasks created after the monthly
                    planning session.
                  </li>
                  <li>
                    <strong>Recurring:</strong> Tasks that repeat every month.
                    Be sure to update progress each month.
                  </li>
                </ul>

                <AlertAttention type="success">
                  <ul>
                    <li>
                      Ensure that you don&apos;t select more that 3 types for a
                      single story
                    </li>
                    <li>
                      Only use one of the following types for a single story:
                      One-Off, Main Task, Subtask
                    </li>
                  </ul>
                </AlertAttention>
              </div>

              {/* Due On */}
              <div className="my-3">
                <SectionHeader small className="mt-5">
                  5. Due On
                </SectionHeader>
                <p>
                  Set the due date by selecting the week it&apos;s due (Week 1
                  to Week 5+). Proper scheduling ensures tasks are spread out
                  and completed on time.
                </p>

                <AlertAttention type="success">
                  Reminder: Weekly planning is based on these dates, so try to
                  be accurate.
                </AlertAttention>
              </div>

              {/* Status */}
              <div className="my-3">
                <SectionHeader small className="mt-5">
                  6. Status
                </SectionHeader>
                <p>Update the current status for each task:</p>
                <ul>
                  <li>
                    <strong>Not Started:</strong> Task hasn’t been initiated.
                  </li>
                  <li>
                    <strong>In Progress:</strong> Task work has begun.
                  </li>
                  <li>
                    <strong>On Hold:</strong> Task is paused.
                  </li>
                  <li>
                    <strong>Waiting for Review:</strong> Task is done but
                    pending approval.
                  </li>
                  <li>
                    <strong>Blocked:</strong> Task cannot proceed due to
                    external issues.
                  </li>
                  <li>
                    <strong>Completed:</strong> Task is finished.
                  </li>
                  <li>
                    <strong>Approved:</strong> Task is completed and approved.
                  </li>
                </ul>
              </div>

              {/* Percentage */}
              <div className="my-3">
                <SectionHeader small className="mt-5">
                  7. Completion %
                </SectionHeader>
                <p>
                  Update this column to reflect task progress, ranging from 0%
                  (not started) to 100% (fully complete). This value will
                  automatically update the progress bar.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="my-3">
                <SectionHeader small className="mt-5">
                  8. Progress Bar
                </SectionHeader>
                <p>This visual indicator shows task progress:</p>
                <ul>
                  <li>
                    <strong>0-49%:</strong> Light red bar indicates low
                    completion.
                  </li>
                  <li>
                    <strong>50-79%:</strong> Orange bar signals moderate
                    progress.
                  </li>
                  <li>
                    <strong>80-100%:</strong> Green bar for high completion.
                  </li>
                </ul>
              </div>

              {/* Blockers */}
              <div className="my-3">
                <SectionHeader small className="mt-5">
                  9. Blockers (If Any)
                </SectionHeader>
                <p>
                  Note any obstacles preventing task completion. Update the
                  status to <strong>Blocked</strong> if there&apos;s an issue.
                  Tag relevant people to resolve the blocker faster.
                </p>

                <AlertAttention type="info">
                  It is better to put longer text in a comment or note.
                </AlertAttention>
              </div>

              {/* Additional Info */}
              <div className="my-3">
                <SectionHeader small className="mt-5">
                  10. Additional Info
                </SectionHeader>
                <p>
                  Include any extra information helpful for task context or team
                  collaboration.
                </p>

                <AlertAttention type="success">
                  Use this to quickly close out tasks you have fully completed
                </AlertAttention>
                <AlertAttention type="info">
                  It is better to put longer text in a comment or note.
                </AlertAttention>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Backend>
  );
};

const AlertAttention = ({ type, children }) => {
  const alertTitle = {
    info: 'Info',
    warning: 'Warning',
    danger: 'Danger',
    success: 'Tip',
  };

  const alertColor = {
    info: 'info',
    warning: 'warning',
    danger: 'danger',
    success: 'success',
  };

  return (
    <section className={`alert-attention ${alertColor[type]}`}>
      <strong>{alertTitle[type]}:</strong> {children}
    </section>
  );
};

export default MonthlyReport;
