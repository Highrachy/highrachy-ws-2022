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
                <p>
                  The checkbox column is used to quickly mark tasks as
                  completed. Once checked, the row text will be struck through,
                  visually indicating that the task is done. However, this does
                  not affect any other values in the row.
                </p>
                <AlertAttention type="success">
                  Use this feature for tasks you have fully completed. For
                  example, &quot;Setting up the blinds in the office&quot; can
                  be marked complete once installed.
                </AlertAttention>
                <AlertAttention type="info">
                  You can use the <strong>Filter</strong> option in Google
                  Sheets to focus on unchecked tasks only. This helps in
                  identifying pending work easily.
                </AlertAttention>
              </div>

              {/* Category */}
              <div className="my-3">
                <SectionHeader small className="mt-6">
                  2. Category
                </SectionHeader>
                <p>
                  Categories help in grouping tasks logically for better
                  organization. Examples of categories include:
                </p>
                <AlertAttention type="success">
                  Always use consistent categories to simplify filtering and
                  searching. For example, avoid using both &quot;HR&quot; and
                  &quot;Human Resources&quot; for similar tasks.
                </AlertAttention>
                <AlertAttention type="info">
                  Consider adding a new category only if the task doesn&apos;t
                  fit existing ones.
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
                      Example: &quot;Set up the blind for the Office&quot; is
                      clearer than &quot;Office setup&quot;. This helps in
                      understanding the task better.
                    </li>
                  </ul>
                </AlertAttention>
              </div>

              {/* Type */}
              <div className="my-3">
                <SectionHeader small className="mt-5">
                  4. Type
                </SectionHeader>
                <p>
                  This column defines the type of task. Select the most
                  appropriate option from the dropdown:
                </p>
                <ul>
                  <li>
                    <strong>One-Off:</strong> A standalone task. Example:
                    &quot;Print business cards for new team members.&quot;
                  </li>
                  <li>
                    <strong>Main Task:</strong> Parent tasks that encompass
                    multiple subtasks. Example: &quot;Launch the product
                    website.&quot;
                  </li>
                  <li>
                    <strong>Subtask:</strong> A part of a main task. Example:
                    &quot;Design the homepage layout for the website.&quot;
                  </li>
                  <li>
                    <strong>High Priority:</strong> Tasks marked urgent will
                    have increased contrast in the progress bar and bolded text
                    for quick visibility. Example: &quot;Prepare emergency
                    response plan for a client meeting.&quot;
                  </li>
                  <li>
                    <strong>From Last Month:</strong> Tasks carried over from
                    the previous month. Example: &quot;Finalize performance
                    reviews from September.&quot;
                  </li>
                  <li>
                    <strong>New:</strong> Recently added tasks. Example:
                    &quot;Draft new policy for hybrid work.&quot;
                  </li>
                  <li>
                    <strong>Recurring:</strong> Monthly tasks. Text is displayed
                    in gray. Example: &quot;Submit monthly expense report.&quot;
                  </li>
                </ul>
                <AlertAttention type="success">
                  For tasks marked as High Priority, ensure they&apos;re
                  genuinely urgent to prevent overloading the category.
                </AlertAttention>

                <AlertAttention type="info">
                  <ul>
                    <li>
                      Avoid selecting more than three types for a single task.
                      For instance, a task cannot be both &quot;One-Off&quot;
                      and &quot;Recurring&quot;.
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
                  Set the due date by selecting the corresponding week (Week 1
                  to Week 5+). For tasks spanning multiple weeks, specify both
                  the start and end weeks.
                </p>
                <AlertAttention type="success">
                  Weekly planning relies on these dates. Ensure dates align with
                  team availability and priorities.
                </AlertAttention>
                <AlertAttention type="info">
                  To filter tasks by selected weeks in Google Sheets, use the{' '}
                  <strong>Filter</strong> feature:
                  <ul>
                    <li>Click the filter icon in the header row.</li>
                    <li>
                      Select &quot;Filter by values&quot; and choose the weeks
                      you want to view.
                    </li>
                  </ul>
                </AlertAttention>
              </div>

              {/* Status */}
              <div className="my-3">
                <SectionHeader small className="mt-5">
                  6. Status &amp; Completion Metrics
                </SectionHeader>

                <p>
                  Track task progress using clear statuses and matching
                  completion percentages. This helps every department &mdash;
                  Legal, Projects, IT, Architecture, Sales, and Operations
                  &mdash; stay aligned and understand progress easily.
                </p>

                <ul>
                  <li>
                    <strong>Not Started (0%):</strong> No work has started yet.
                    The task is scheduled and waiting for action.
                  </li>

                  <li>
                    <strong>In Progress (1% &ndash; 50%):</strong> Work has
                    started. Update the percentage regularly to reflect actual
                    progress. Raise risks, delays, or dependencies early.
                  </li>

                  <li>
                    <strong>On Hold:</strong> The task is temporarily paused due
                    to an internal or external dependency beyond our control.
                    Example: &quot;Waiting for client feedback&quot;,
                    &quot;Pending site access&quot;, or &quot;Awaiting legal
                    documents&quot;.
                  </li>

                  <li>
                    <strong>Blocked:</strong> Work cannot continue because of an
                    unresolved issue beyond our control. Example: &quot;System
                    error&quot;, &quot;Approval pending&quot;, or
                    &quot;Regulatory delay&quot;.
                  </li>

                  <li>
                    <strong>Review Ongoing (51% &ndash; 69%):</strong> The main
                    work is completed and submitted for review, validation, or
                    feedback. This may apply to design drafts, contracts, system
                    updates, site reports, or financial reviews.
                  </li>

                  <li>
                    <strong>Completed (70% &ndash; 79%):</strong> The task work
                    is finished and confirmed internally. It may still require
                    formal handoff, validation, testing, or leadership approval.
                  </li>

                  <li>
                    <strong>
                      Sent to Next Person / Dept (80% &ndash; 89%):
                    </strong>{' '}
                    The task has been handed over to the next responsible person
                    or department for further validation, approval, or
                    implementation. At this stage, additional verification may
                    be required before final approval such as proper testing,
                    stakeholder feedback, quality checks, compliance
                    confirmation, or live usage validation.
                  </li>

                  <li>
                    <strong>Approved (90% &ndash; 95%):</strong> The task has
                    been reviewed and officially accepted by the responsible
                    authority. No major rework is expected.
                  </li>

                  <li>
                    <strong>
                      Concluded / Filed / Archived (96% &ndash; 99%):
                    </strong>{' '}
                    The task is formally wrapped up and properly documented. It
                    remains stored in the system for record, audit, or
                    compliance purposes.
                  </li>

                  <li>
                    <strong>Fully Closed / Fully Resolved (100%):</strong> The
                    task is completely finalized. All actions are complete,
                    documentation is in order, dependencies are cleared, and no
                    further follow-up is required.
                  </li>
                </ul>

                <AlertAttention type="info">
                  Always update the completion percentage together with the task
                  status.
                  <br />
                  <br />
                  Add clear comments when a task is <strong>On Hold</strong> or
                  <strong> Blocked</strong> so other teams understand the reason
                  and can help resolve it quickly.
                </AlertAttention>
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
                    <strong>80-100%:</strong> Green bar for high task
                    completion.
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
